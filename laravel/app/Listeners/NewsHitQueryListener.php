<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NewsHitQueryListener implements ShouldQueue
{
    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        $event->query['event_type'] = 'hit_query';
        file_put_contents('analytics.json', json_encode($event->query), FILE_APPEND);
    }
}
