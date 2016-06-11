<?php

namespace SkysoulDesign\Payment\Middleware;

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

        foreach (app('payment.drivers') as $driver) {

            if ($request->has($driver->uniqueIdentifierKey)) {

                /**
                 * Bind Transaction in case request has parameters
                 */
                $request->route()->setParameter(
                    Transaction::class,
                    Transaction::where('unique_no', $request->input('out_trade_no'))->firstOrFail()
                );

                break;
            }
        }

        return $next($request);
    }
}
