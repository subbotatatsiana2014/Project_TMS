<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\support\Facades\View;

class ViewServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        View::composer('partials.header', function ($view) {
           $view->with('menuList', [
               [
                    'name' => 'Home',
                    'link' => '/'
               ],
               [
                   'name' => 'News',
                   'link' => '/news'
               ],
               [
                   'name' => 'About',
                   'link' => '/about'
               ],
           ]);
        });
    }
}
