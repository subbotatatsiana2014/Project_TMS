<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function test(Request $request)
    {
        $news_id = $request->id;
        $news = News::where('id', $news_id)->get()->toArray();
        dd($news, $request->test);
        echo "
            <a href='" . route('route_test') . "'>test</a>
            <a href='" . route('route_test1') . "'>test1</a>
            <a href='" . route('route_test2') . "'>test2</a>
        ";
    }

    public function test1()
    {
        echo "
            <a href='" . route('route_test', [5, 'ky']) . "'>test</a>
            <a href='" . route('route_test1') . "'>test1</a>
            <a href='" . route('route_test2') . "'>test2</a>
        ";
    }

    public function test2()
    {
        return redirect()->route('route_test');
    }
}
