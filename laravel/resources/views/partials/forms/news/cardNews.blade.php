<li>
    title = {{$item->title}}
    <br>
    desc = {{$item->description}}
    <br>
    <br>
    <a href="{{route('news.show', $item->id)}}">Детальная страница новости</a>
</li>
