<?php

namespace DreamsArk\Http\Controllers\User;

use Illuminate\Http\Request;

use DreamsArk\Http\Requests;
use DreamsArk\Http\Controllers\Controller;
use SkysoulDesign\Payment\Payment;

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
//        $data = [
//            'discount' => '0.00',
//            'payment_type' => '1',
//            'subject' => 'payment.subject',
//            'trade_no' => '2016061121001004390290733920',
//            'buyer_email' => 'rafael.milewski@gmail.com',
//            'gmt_create' => '2016-06-11 00:27:46',
//            'notify_type' => 'trade_status_sync',
//            'quantity' => '1',
//            'out_trade_no' => 'DAPGab1b730e8a18de40c790e2051328f697',
//            'seller_id' => '2088221979483694',
//            'notify_time' => '2016-06-11 00:31:14',
//            'body' => 'payment.description',
//            'trade_status' => 'TRADE_SUCCESS',
//            'is_total_fee_adjust' => 'N',
//            'total_fee' => '0.01',
//            'gmt_payment' => '2016-06-11 00:27:53',
//            'seller_email' => 'dreamsark666@163.com',
//            'price' => '0.01',
//            'buyer_id' => '2088022177082393',
//            'notify_id' => '04ceb9134aa252a985d67bc109cc591j0e',
//            'use_coupon' => 'N',
//            'sign_type' => 'RSA',
//            'sign' => 'Ijnp+/UxoXsHkwhV32swjXhunRB09Ih/l6AHAa3lfpCOJkC0AtZQHwTiGDgvwlFSgb7E6BCnVbrzMH5Kt2XMwdM20j4rJjY8+SKSeQmcgPRmJDevttJc9TMenRttrwVSuZxiMnOjAB4AmJXKn8ufswDN5Td5bY$'
//        ];
//
//        $transaction = $request->user()->transactions->first();
//        $payment->forTransaction($transaction);;
//        dd($payment->verify($data));

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
