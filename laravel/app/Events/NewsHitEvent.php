<?php

namespace App\Events;

use http\Env\Request;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewsHitEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $header;

    public $query;
    /**
     * Create a new event instance.
     */
    public function __construct(\Illuminate\Http\Request $data)
    {
        $this->header = $data->header();
        $this->query = $data->query();
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    }
}
