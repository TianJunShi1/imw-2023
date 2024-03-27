for (let i = 0; i < 700; i++) {
  $("body").append(`<div class="block" data-id="${i}"></div>`)
}

$(".block").each(function () {
  $(this).mouseenter(function () {
    let i = $(this).attr("data-id")
    $(this).css({ 'background-color': `hsl(${i},50%,50%)` })
    $(this).addClass("blockScale")
  })
})

$(document).on("keypress", function () {
  $(".block").removeAttr('style')
  $(".block").removeClass('blockScale')
})