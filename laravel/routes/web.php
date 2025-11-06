<?php

use App\Http\Controllers\TestController;
use App\Http\Controllers\QueueController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;


// Route::get('/news', [\App\Http\Controllers\NewsController::class, 'index']);
Route::resource('news', NewsController::class);

Route::prefix('/admin')->group(function () {
    Route::get('/test/{id}/example/{ky}', [TestController::class, 'test'])->name('route_test');
    Route::get('/test1', [TestController::class, 'test1'])->name('route_test1');
    Route::get('/test2', [TestController::class, 'test2'])->name('route_test2');
});

Route::get('/queue', [QueueController::class, 'index']);
