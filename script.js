

(function($){
    $(function(){
        doUI();
        setInterval(doUI, 200);
    });

    var taskStates = ['Todo', 'InProgress', 'Done'];

    function doUI() {
        var user = $('#header-row li[command=user] .text').text();

        $('.tbTileContent').each(function(){
            var $self = $(this);

            if ($self.hasClass('creCustom')){
                return;
            }

            var itemDesc = $self.find('.witTitle').text(),
                isFE = /^(.)*FE:(.)*$/.test(itemDesc),
                isBE = /^(.)*BE:(.)*$/.test(itemDesc),
                isBug = /^\[Bug\](.)*$/.test(itemDesc),
                isBlocked = /^\[Blocked\](.)*$/.test(itemDesc);

            $self.addClass('creCustom');

            if(isFE) {
                $self.addClass('creFE');
            }
            else if(isBE) {
                $self.addClass('creBE');
            }
            
            if(isBug) {
                $self.addClass('creBug');
            }
            if (isBlocked) {
                $self.addClass('creBlocked');
            }

            var boardColNum = $self.closest('td').attr('axis').slice(-1);
            $self.addClass('cre' + taskStates[boardColNum]);

            // owner text
            var $ownerText = $self.find('.witAssignedTo .onTileEditTextDiv');
            var currItemOwner = $ownerText.attr('title');
            $ownerText.attr('title', null);

            if(currItemOwner === user) {
                $self.addClass('creMineTask');
            }

            // owner photo
            if ($self.find('.photo').length == 0) {
                $self.find('.witRemainingWork').after('<div class="photo" title="' + currItemOwner + '" />');
            }

            var picRelatedClassName = currItemOwner.replace(/\s+/g, '');
            $self.addClass(picRelatedClassName);

            // work left
            var $workLeft = $self.find('.witRemainingWork .onTileEditTextDiv');
            $workLeft.attr('title', $workLeft.attr('title') ? null : 'Update hours');
        });
    }
})(jQuery);