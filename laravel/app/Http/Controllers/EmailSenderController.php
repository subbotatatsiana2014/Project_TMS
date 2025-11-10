<?php

namespace App\Http\Controllers;

use App\Mail\NewsMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Http\Request;
use Illuminate\Mail\Mailable;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Mail;

class EmailSenderController extends Mailable implements ShouldQueue
{
    public function index() {
        $data = [
            'name' => 'Tatsiana',
            'message' => 'First message',
        ];

        $mailObj = new NewsMail($data);
        Mail::to('tatsiana@mail.ru')->send($mailObj);
    }
}
