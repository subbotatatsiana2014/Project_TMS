<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendFileDataJob implements ShouldQueue
{
    use Queueable;

    protected $data;

    /**
     * Create a new job instance.
     */
    public function __construct($data)
    {
        $data['time'] = date('Y-m-d H:i:s');
        $this->data = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        file_put_contents('queue.json', json_encode($this->data, JSON_PRETTY_PRINT), FILE_APPEND);
    }
}
