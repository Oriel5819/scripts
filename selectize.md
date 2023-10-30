<div class="form-group">
                            <label for="edit22h_leader">Leader</label>
                            <select class="form-control selectize_leader" id="edit22h_leader" placeholder="Energie pour 6 à 14h"></select>
                        </div>

$('.selectize_leader').selectize({
            options : selectize_super,
            multiple : false,
            maxItems : 2,
            searchField: ['alias','text','login']
        });
