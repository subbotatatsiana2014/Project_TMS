<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NewsSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('news')->truncate();

        for ($i = 0; $i < 100; $i++) {
            DB::table('news')->insert([
               'title' => 'news title ' . $i,
               'description' => 'news description ' . $i,
            ]);
        }

    }
}
