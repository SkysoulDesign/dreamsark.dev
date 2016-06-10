<?php

namespace DreamsArk\Http\Middleware;

use Closure;
use DreamsArk\Models\Payment\Transaction;

/**
 * Class TransactionMiddleware
 *
 * @package DreamsArk\Http\Middleware
 */
class TransactionMiddleware
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
         * Bind Transaction in case request has parameters
         */
        $request->route()->setParameter(
            Transaction::class,
            Transaction::where('unique_no', $request->input('out_trade_no'))->first()
        );

        return $next($request);
    }
}
