<?php

namespace DreamsArk\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\View\Compilers\BladeCompiler;

/**
 * Class AppServiceProvider
 *
 * @package DreamsArk\Providers
 */
class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @param \Illuminate\View\Compilers\BladeCompiler $blade
     */
    public function boot(BladeCompiler $blade)
    {
        $blade->directive('set', function($expression) {
            list($name, $val) = explode(',', $expression);
            return "<?php {$name} = {$val}; ?>";
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

    }
    
}
