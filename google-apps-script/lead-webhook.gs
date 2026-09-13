/**
 * 주안국가산단역 제이원플렉스 — 관심고객 접수 수신 스크립트
 *
 * 홈페이지의 관심고객 등록 폼에서 보낸 내용을 구글 시트에 한 줄씩 쌓고,
 * 동시에 이메일 알림을 보냅니다.
 *
 * 설치 방법은 저장소 루트의 LEADS_SETUP.md 를 그대로 따라 하시면 됩니다.
 */

/** 접수 내용이 쌓일 시트(탭) 이름 */
var SHEET_NAME = '관심고객';

/**
 * 알림을 받을 이메일 주소.
 * 비워 두면 이 스크립트를 만든 구글 계정의 주소로 자동 발송됩니다.
 * 여러 명이 받으려면 쉼표로 구분하세요. 예: 'a@gmail.com, b@gmail.com'
 */
var NOTIFY_EMAIL = '';

var HEADERS = [
  '접수시각',
  '접수번호',
  '성함',
  '연락처',
  '관심 상품',
  '관심 타입',
  '상담 희망 시간',
  '문의 내용',
  '개인정보 동의',
];

function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) || '';
    var lead = JSON.parse(raw);

    if (!lead || !String(lead.name || '').trim() || !String(lead.phone || '').trim()) {
      return jsonOut_({ ok: false, error: 'name_and_phone_required' });
    }

    // 홈페이지는 응답을 읽지 못했을 때 한 번 더 보냅니다.
    // 같은 접수가 두 줄로 쌓이지 않도록 최근 줄에서 먼저 확인합니다.
    if (isRecentDuplicate_(lead)) {
      return jsonOut_({ ok: true, duplicate: true });
    }

    var row = [
      lead.createdAt || new Date().toLocaleString('ko-KR'),
      lead.id || '',
      String(lead.name).trim(),
      // 앞자리 0 이 사라지지 않도록 문자로 고정합니다.
      "'" + String(lead.phone).trim(),
      lead.interestCategory || '',
      lead.preferredType || '',
      lead.preferredTime || '',
      lead.message || '',
      lead.privacyAgreed ? '동의' : '미동의',
    ];

    getSheet_().appendRow(row);
    notify_(lead);

    return jsonOut_({ ok: true });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}

/** 브라우저에서 주소를 직접 열었을 때 동작 확인용 */
function doGet() {
  return jsonOut_({ ok: true, message: '제이원플렉스 관심고객 접수 스크립트가 정상 동작 중입니다.' });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#EEF1F5');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160); // 접수시각
    sheet.setColumnWidth(3, 90); // 성함
    sheet.setColumnWidth(4, 130); // 연락처
    sheet.setColumnWidth(5, 240); // 관심 상품
    sheet.setColumnWidth(6, 200); // 관심 타입
    sheet.setColumnWidth(8, 320); // 문의 내용
  }

  return sheet;
}

/**
 * 최근 접수 줄 중에 접수번호와 연락처가 모두 같은 것이 있는지 확인합니다.
 * 재전송으로 생기는 중복만 걸러내려는 것이므로 최근 20줄만 봅니다.
 */
function isRecentDuplicate_(lead) {
  var sheet = getSheet_();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  var count = Math.min(20, lastRow - 1);
  var startRow = lastRow - count + 1;
  // B열(접수번호) ~ D열(연락처)
  var values = sheet.getRange(startRow, 2, count, 3).getValues();

  var id = String(lead.id || '').trim();
  var phone = String(lead.phone || '').trim();
  if (!id) return false;

  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0]).trim() === id && String(values[i][2]).trim() === phone) {
      return true;
    }
  }
  return false;
}

function notify_(lead) {
  var to = String(NOTIFY_EMAIL || '').trim() || Session.getEffectiveUser().getEmail();
  if (!to) return;

  var name = String(lead.name || '').trim();
  var phone = String(lead.phone || '').trim();
  var subject = '[제이원플렉스] 관심고객 등록 — ' + name + ' ' + phone;

  var rows = [
    ['성함', name],
    ['연락처', phone],
    ['관심 상품', lead.interestCategory || '-'],
    ['관심 타입', lead.preferredType || '-'],
    ['상담 희망 시간', lead.preferredTime || '-'],
    ['문의 내용', lead.message || '-'],
    ['접수시각', lead.createdAt || ''],
    ['접수번호', lead.id || ''],
  ];

  var tableRows = rows
    .map(function (r) {
      return (
        '<tr>' +
        '<td style="padding:7px 14px 7px 0;color:#5A6472;white-space:nowrap;vertical-align:top">' +
        escapeHtml_(r[0]) +
        '</td>' +
        '<td style="padding:7px 0;font-weight:600;color:#151A21">' +
        escapeHtml_(String(r[1])).replace(/\n/g, '<br>') +
        '</td>' +
        '</tr>'
      );
    })
    .join('');

  var html =
    '<div style="font-family:-apple-system,BlinkMacSystemFont,\'Malgun Gothic\',sans-serif;font-size:15px;line-height:1.7;color:#151A21">' +
    '<p style="margin:0 0 4px;font-size:13px;letter-spacing:.08em;color:#8A94A3">주안국가산단역 제이원플렉스</p>' +
    '<h2 style="margin:0 0 18px;font-size:20px">새 관심고객이 등록되었습니다</h2>' +
    '<table style="border-collapse:collapse;margin-bottom:22px">' +
    tableRows +
    '</table>' +
    '<p style="margin:0"><a href="tel:' +
    encodeURIComponent(phone.replace(/-/g, '')) +
    '" style="display:inline-block;background:#0B5FAD;color:#fff;text-decoration:none;font-weight:700;padding:11px 20px;border-radius:8px">' +
    escapeHtml_(phone) +
    ' 전화 걸기</a></p>' +
    '</div>';

  var plain = rows
    .map(function (r) {
      return r[0] + ': ' + r[1];
    })
    .join('\n');

  MailApp.sendEmail({ to: to, subject: subject, body: plain, htmlBody: html });
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function jsonOut_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
