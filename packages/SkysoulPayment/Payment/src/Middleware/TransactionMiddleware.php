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

        foreach (app('payment.drivers') as $driverName => $driver) {

            if ($driver instanceof SelfHandle) {
                $requestRawArr = $driver->parseRawRequest($this->readPrivateKey($driverName));
                $request->merge($requestRawArr);
//                \Log::info($request->all());
            }
            $whereColumn = '';
            $requestKey = '';
            if ($request->has($driver->uniqueIdentifierKey)) {
                $whereColumn = 'unique_no';
                $requestKey = $driver->uniqueIdentifierKey;
            } else if ($driver->uniqueInvoiceNoKey != '' && $request->has($driver->uniqueInvoiceNoKey)) {
                $whereColumn = 'invoice_no';
                $requestKey = $driver->uniqueInvoiceNoKey;
            }
            if ($whereColumn != '' && $requestKey != '') {
                /**
                 * Bind Transaction in case request has parameters
                 */
                $request->route()->setParameter(
                    Transaction::class,
                    Transaction::where($whereColumn, $driver->getUniqueNoWithPrefix($request->input($requestKey)))->firstOrFail()
                );
                break;
            }

        }

        return $next($request);
    }

    private function readPrivateKey($driverName)
    {
        return config('payment.drivers.' . $driverName . '.private_key') ?: file_get_contents(config('payment.drivers.' . $driverName . '.private_key_path'));
    }
}
