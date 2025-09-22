var _wx = _wxLink[Math.floor(Math.random() * _wxLink.length)];
var _qq = _qqLink[Math.floor(Math.random() * _qqLink.length)];
var _kf = _kfLink[Math.floor(Math.random() * _kfLink.length)];

if (!_cs) {
  $('.contactDiv').hide();
}
if (!_qs) {
  $('.qiyechuanshuDiv').hide();
}

function wx() {
  window.open(_wx); 
}

function qq() {
  window.open(_qq); 
}

function kf() {
  window.open(_kf);
}

$(document).ready(function() {
  $('#zyid').html(_zhuan_yuan_id);
  $('#qyid').html(_qi_ye_id);
  
  // 为复制按钮绑定点击事件
  $('#copyZy').on('click', function() {
    copyText(_zhuan_yuan_id);
  });
  
  $('#copyQy').on('click', function() {
    copyText(_qi_ye_id);
  });
});

// 兼容性更好的复制函数
function copyText(text) {
  // 方法1: 优先使用现代 Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      showToast("复制成功");
    }).catch(function(err) {
      // 如果现代API失败，回退到传统方法
      console.error('现代API复制失败:', err);
      fallbackCopyText(text);
    });
  } else {
    // 方法2: 使用传统的execCommand方法
    fallbackCopyText(text);
  }
}

// 传统复制方法作为备选方案
function fallbackCopyText(text) {
  // 创建临时textarea元素
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // 设置样式使其不可见但可选中
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = '0';
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.style.opacity = '0';
  
  document.body.appendChild(textArea);
  
  // 选中文本
  textArea.focus();
  textArea.select();
  
  try {
    // 执行复制命令
    var successful = document.execCommand('copy');
    if (successful) {
      showToast("复制成功");
    } else {
      showToast("复制失败，请手动复制");
    }
  } catch (err) {
    console.error('传统复制方法失败:', err);
    showToast("复制失败，请手动选择文本复制");
  }
  
  // 清理DOM
  document.body.removeChild(textArea);
}

// 显示提示消息
var i = 0;
function showToast(text) {
  i++;
  var _id = "toast" + i;
  $('.mask').append('<div class="toast" id="' + _id + '"><p>' + text + '</p></div>');
  setTimeout(function() {
    $("#" + _id).remove();
  }, 1500);
}