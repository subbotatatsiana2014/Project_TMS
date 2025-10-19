<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;

// Route::get('/news', [\App\Http\Controllers\NewsController::class, 'index']);
Route::resource('news', NewsController::class);
