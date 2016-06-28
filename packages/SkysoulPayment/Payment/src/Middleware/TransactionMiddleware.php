<?php

namespace SkysoulDesign\Payment\Middleware;

use Closure;
use DreamsArk\Models\Payment\Transaction;
use Illuminate\Http\Request;
use SkysoulDesign\Payment\Contracts\SelfHandle;
use SkysoulDesign\Payment\PaymentGateway;

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
     * @param  Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

        \Log::info($request->route('driver'));
        /**
         * @var PaymentGateway $driver 
         */
        if ($driver = app('payment.drivers')[$request->route('driver')]) {

            if ($driver instanceof SelfHandle) {

                $request->merge(
                    $driver->parseResponse($request->getContent())
                );

            }

            if ($request->has($driver->uniqueNotifyKey))
                $driver->prepareInternalKeys($request->get($driver->uniqueNotifyKey));

            if (!$request->has('invoice_no'))
                $request->offsetSet('invoice_no', $request->get($driver->uniqueInvoiceNoKey));

            \Log::info($request->all());

            /**
             * If request has the required key for this driver
             */
            if ($request->has($driver->uniqueIdentifierKey)) {

                $request->route()->setParameter('driver',
                    Transaction::where('unique_no', $request->input($driver->uniqueIdentifierKey))->firstOrFail()
                );

            }
        }

        return $next($request);
    }
}
