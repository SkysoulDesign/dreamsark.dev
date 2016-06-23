<?php

namespace DreamsArk\Http\Controllers\User;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Models\Payment\Transaction;
use Illuminate\Http\Request;

/**
 * Class PurchaseController
 *
 * @package DreamsArk\Http\Controllers\User
 */
class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        /** @var Transaction $trans */
        /*$trans = Transaction::find(72)->load('messages');
        $response = $trans->messages->response;
        unset($response['invoice_no']);
        dd($trans->payment->verify($response));*/

//        $message = '';
//        if ($request->has('status')) {
//            $payStatus = $request->get('status');
//            if ($payStatus == 'pending')
//                $message = trans('payment.paid-receipt-not-received-check-later');
//            else if ($payStatus == 'success')
//                $message = trans('payment.your-purchase-has-been-made');
//        }

        return view('user.payment.index')
            ->with('user', $user = $request->user())
            ->with('transactions', $user->transactions);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
