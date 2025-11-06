<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeEventServiceProvider extends Command
{
    protected $signature = 'make:event-provider {name=EventServiceProvider}';
    protected $description = 'Create a new event service provider';

    public function handle()
    {
        $name = $this->argument('name');
        $providerPath = app_path('Providers/' . $name . '.php');

        // Проверяем, существует ли файл
        if (File::exists($providerPath)) {
            $this->error("Provider {$name} already exists!");
            return 1;
        }

        // Создаем директорию, если её нет
        File::ensureDirectoryExists(app_path('Providers'));

        // Содержимое файла
        $content = $this->getStubContent($name);

        // Создаем файл
        File::put($providerPath, $content);

        $this->info("Event Service Provider [{$name}] created successfully!");
        $this->info("Path: {$providerPath}");

        return 0;
    }

    protected function getStubContent($name)
    {
        return <<<EOT
<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class {$name} extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected \$listen = [
        // Register your events and listeners here
        // Example:
        // 'App\Events\OrderShipped' => [
        //     'App\Listeners\SendShipmentNotification',
        // ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
EOT;
    }
}
