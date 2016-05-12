<?php

namespace DreamsArk\Http\Controllers\User\Bag;

use DreamsArk\Commands\Bag\PurchaseCoinCommand;
use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\Bag\CoinCreation;
use Illuminate\Http\Request;

/**
 * Class CoinController
 *
 * @package DreamsArk\Http\Controllers\User\Bag
 */
class CoinController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('user.payment.coin.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CoinCreation|Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(CoinCreation $request)
    {
        $command = new PurchaseCoinCommand($request->user(), $request->get('amount'));
        $this->dispatch($command);
        return redirect()->back();
    }

}
