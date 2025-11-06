<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NewsHitHeaderListener implements ShouldQueue
{
    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        $event->header['event_type'] = 'hit_header';
        file_put_contents('analytics.json', json_encode($event->header) . PHP_EOL, FILE_APPEND);
    }
}
