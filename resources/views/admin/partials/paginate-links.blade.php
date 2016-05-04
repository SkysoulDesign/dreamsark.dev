<tfoot>
<tr>
    <th colspan="{{ $colSpan or 3 }}">
        <div class="ui right floated pagination menu">
            <a href="{{ $resultSet->previousPageUrl() }}" class="icon item">
                <i class="left chevron icon"></i>
            </a>
            @if($resultSet->currentPage()>1)
                <a href="{{ $resultSet->url(1) }}" class="item">1</a>
                @if($resultSet->currentPage()>2)
                    <div class="item">...</div>
                @endif
            @endif
            <div class="active item">{{ $resultSet->currentPage() }}</div>
            @for($i=$resultSet->currentPage()+1; ($i<= $resultSet->currentPage()+3 && $i<=$resultSet->lastPage()); $i++)
                <a href="{{ $resultSet->url($i) }}" class="item">{{ $i }}</a>
            @endfor
            <a href="{{ $resultSet->nextPageUrl() }}" class="icon item">
                <i class="right chevron icon"></i>
            </a>
        </div>
    </th>
</tr>
</tfoot>