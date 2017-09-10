// ----------------------------------------------------------------------------
// Medium Posts
// ----------------------------------------------------------------------------
//

var $        = require('jQuery');
var _        = require('lodash');


module.exports = function() {
    // $(document).on('click', 'body', _.bind(medium.displayPosts, medium));
};

var medium = {
    /**
     * 
     * @param  {Event} e
     */
    displayPosts: function(e)
    {
        var rssurl = 'https://medium.com/feed/@ohdeer';

        $.get(rssurl, function(data) {
            var $xml = $(data);
            $xml.find('item').each(function() {
                var $this = $(this),
                    item = {
                        title: $this.find('title').text(),
                        link: $this.find('link').text(),
                        description: $this.find('description').text(),
                        pubDate: $this.find('pubDate').text(),
                        author: $this.find('author').text()
                }
                
                console.log(item);

            });
        });
    }
};
