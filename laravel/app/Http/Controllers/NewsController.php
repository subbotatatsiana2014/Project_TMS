<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    CONST NEWS_COUNT = 10;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = News::paginate(self::NEWS_COUNT);

        return view('pages.news.index', compact('news'));
        //return response()->json($news);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $news_count = News::count();
        $next_news_number = $news_count + 1;

        return view('pages.news.create', compact('next_news_number'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
           'title' => 'required|max:255',
           'description' => 'required|max:255',
        ]);

        News::create($validatedData);

        return redirect()->route('news.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $new_item = News::where('id', $id)->firstOrFail();
        return view('pages.news.show', compact('new_item'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
