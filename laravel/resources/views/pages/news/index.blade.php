@extends('layouts.app')
@section('title', 'Страница новостей')
@section('content')
    <div class="button_container">
        <a class="button" href="{{route('news.create')}}">Создать</a><br><br>
    </div>
    <ul>
        @foreach($news as $item)
            @include('partials.forms.news.cardNews')
        @endforeach
    </ul>
@endsection
