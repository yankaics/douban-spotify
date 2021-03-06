var qpath = 'https://api.spotify.com/v1/search?type=album';
isOpenSpotifyDirect = null;

var spotifyPage = function () {
    var subjectsCon = $('.grid-view'),
    menuLeft = subjectsCon.offset().left + subjectsCon.width();
    $('.item').each(
        function (index) {
            var itemCon = $(this), album = $(this).find('.title>a>em').text(),
            infos = $(this).find('.intro').text().split('/'),
            artist = infos[infos.length - 1].replace(' ', '');;
            $.ajax({url:qpath,
                    crossDomain:true,
                    data:{q:album.concat(' artist:', artist)},
                    success:function (ret) {
                        if (ret.albums.total && ret.albums.total > 0) {
                            // var q = ret.info.query;
                            var q = '';
                            addSpotifyBtn(itemCon.find('.title'), q, menuLeft, ret.albums.items);
                        }
                    }
                   });
        });
};

chrome.extension.sendRequest({method:"getLocalStorage", key:"isOpenSpotifyDirect"},
                             function(response) {
                                 isOpenSpotifyDirect = (response.data == 'false') ? false : true;
                                 spotifyPage();
                             });
