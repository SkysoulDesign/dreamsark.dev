<?php

namespace DreamsArk\Http\Controllers\User;

use DreamsArk\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * Class InventoryController
 *
 * @package DreamsArk\Http\Controllers\User
 */
class InventoryController extends Controller
{

    /**
     * @param Request $request
     * @return $this
     */
    public function index(Request $request)
    {
        return view('user.inventory.index')
            ->with('items', $request->user()->items);
    }

}
