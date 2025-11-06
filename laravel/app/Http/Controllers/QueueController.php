<?php

namespace App\Http\Controllers;

use App\Jobs\SendFileDataJob;
use Illuminate\Http\Request;

class QueueController extends Controller
{
    public function index()
    {
        dd(SendFileDataJob::dispatch(['name' => 'Tatsiana', 'age' => 32]));
    }
}
