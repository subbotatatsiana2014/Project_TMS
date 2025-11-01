@extends('layouts.app')
@section('title', 'Добавить новость ' . $next_news_number)
@section('content')
    @include('partials.forms.news.createNews')
@endsection
