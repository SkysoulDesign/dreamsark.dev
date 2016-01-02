<?php

namespace DreamsArk\Http\Middleware;

use Closure;

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
            app()->setLocale(auth()->user()->settings->language);
        }

        /**
         * if locate is set, override user language
         */
        if ($locate = session('locate')) {
//            app()->setLocale($locate);
        }

        return $next($request);

    }
}
