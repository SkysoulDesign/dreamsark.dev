<?php

namespace SkysoulDesign\Payment\Middleware;

use Closure;
use DreamsArk\Models\Payment\Transaction;
use SkysoulDesign\Payment\Contracts\SelfHandle;

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

            if ($driver instanceof SelfHandle) {

                $request->merge(
                    $driver->parseResponse($request->getContent())
                );

            }

            /**
             * If request has the required key for this driver
             */
            if ($request->has($driver->uniqueIdentifierKey)) {

                /**
                 * The False default is just in case that there is no invoice_key
                 * then it would match any null value on db
                 */
                $request->route()->setParameter(
                    Transaction::class,
//                    Transaction::where('unique_no', $request->input($driver->uniqueIdentifierKey))->firstOrFail(),
                    Transaction::where('unique_no', $request->input('nonce_str'))->firstOrFail()
                );

                /**
                 * Example of the response returned
                 * 'nonce_str' => '1e9c6dc03fdb76cd9f68b67f291c203d',
                 * 'out_trade_no' => '6dc03fdb76cd9f68b67f291c203d',
                 */

                break;
            }
        }

        return $next($request);
    }
}
