<?php

namespace DreamsArk\Http\ViewComposers;

use Illuminate\Http\Request;
use Illuminate\View\View;

/**
 * Class UserComposer
 *
 * @package DreamsArk\Http\ViewComposers
 */
class UserComposer
{

    /**
     * @var Request
     */
    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Bind data to the view.
     *
     * @param  View $view
     */
    public function compose(View $view)
    {
//        $view->with('active', implode('.', $this->request->segments()));
    }

}