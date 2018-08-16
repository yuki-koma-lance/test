// import json
// import xmljson
// from lxml.etree import parse
//
//
// tree = parse('https://www.lancers.jp/magazine/feed/')
//
// root = tree.getroot()
//
//
// with open('sample.json', 'w') as fw:
//     json.dump(xmljson.yahoo.data(root), fw, indent=2)

$.ajax({
        //XML形式だったのでうまく行かない。
     url:'https://www.lancers.jp/magazine/feed/',

     success: function(data){

                    //はてなrssの読み込み
                    var rss_url = 'https://www.lancers.jp/magazine/feed/';
                    var htmlstr = "";
                    htmlstr += '<div class="recomend">';
                    htmlstr += '<h2>関連記事</h2>';
                    htmlstr += '<ul>';

                    //アイテムの調整
                    $.get(rss_url, function(data) {
                      $(data).find("item").each(function (i) {
                        var el = $(this);
                        var elimg = el.find("enclosure").attr("url");

                        htmlstr += '<li class="section">';
                        htmlstr += '<p class="imgP"><img src="' + elimg + '" alt="" width="170" ></p>';
                        htmlstr += '<a href="' + el.find("link").text() + '" title="' + el.find("title").text() + '" target="_blank">' + el.find("title").text() + ' - ' + el.find("category").text() + '</a>';
                        htmlstr += '</li>';

                        if(i === 5) { // 表示件数の設定
                            return false;
                            };
                   });

                  htmlstr += '</ul>';
                  htmlstr += '</div>';

                  //footer前に挿入する
                  $('footer').before(htmlstr);
                  });
     }
});
