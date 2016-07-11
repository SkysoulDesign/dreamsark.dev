<?php

namespace DreamsArk\Http\Middleware;

use Closure;

/**
 * Class Localization
 *
 * @package DreamsArk\Http\Middleware
 */
class Localization
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        /**
         * Set User Language
         */
        if (auth()->check()) {
            app()->setLocale(
                $request->user()->settings->language
            );
        }

        /**
         * if locate is set, override user language
         */
        if ($language = $request->session()->get('language')) {
            app()->setLocale($language);
        }

        return $next($request);

    }
}
