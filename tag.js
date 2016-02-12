var qpath = 'https://api.spotify.com/v1/search?type=album',
isOpenSpotifyDirect = null;

var spotifyPage = function () {
    var subjectsCon = $('#subject_list'),
    menuLeft = subjectsCon.offset().left + subjectsCon.width();
    $('.item').each(
        function (index) {
            var itemCon = $(this),
            album = $(this).find('.pl2>a').text().split('/')[0],
            infos = $(this).find('p.pl').text().split('/'),
            artist = infos[infos.length - 1].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            $.ajax({url:qpath,
                    crossDomain:true,
                    data:{q:album.concat(' artist:', artist)},
                    success:function (ret) {
                        if (ret.albums.total && ret.albums.total > 0) {
                            // var q = ret.info.query;
                            var q = '';
                            addSpotifyBtn(itemCon.find('.pl2'), q, menuLeft, ret.albums.items);
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
