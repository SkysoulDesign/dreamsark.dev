<?php

namespace DreamsArk\Http\Controllers\Bag;

use DreamsArk\Commands\Bag\PurchaseCoinCommand;
use DreamsArk\Http\Requests\Bag\CoinCreation;
use Illuminate\Http\Request;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Controllers\Controller;

class CoinController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('coin.create');
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
