<a href="{{route('news.create')}}">Создать</a><br><br>
<ul>
    @foreach($news as $item)
        <li>
            title = {{$item->title}}
            <br>
            desc = {{$item->description}}
            <br>
            <a href="{{route('news.show', $item->id)}}">Детальная страница новости</a>
        </li>
    @endforeach
</ul>
