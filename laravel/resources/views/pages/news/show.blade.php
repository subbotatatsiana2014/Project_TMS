@extends('layouts.app')
@section('title', 'Детальная страница ' . $new_item->title)
@section('content')
    title = {{$new_item->title}}
    <br>
    desc = {{$new_item->description}}
    <br>
    <a href="{{route('news.index')}}">Список новостей</a>
@endsection
