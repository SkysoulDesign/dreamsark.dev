<?php

namespace DreamsArk\Http\Controllers\Committee\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Jobs\Project\Committee\Review\DestroyExpenditureJob;
use DreamsArk\Models\Project\Expenditures\Expenditure;

/**
 * Class ExpenditureController
 *
 * @package DreamsArk\Http\Controllers\Committee\Project
 */
class ExpenditureController extends Controller
{

    /**
     * Remove the specified resource from storage.
     *
     * @param Expenditure $expenditure
     * @return \Illuminate\Http\Response
     */
    public function destroy(Expenditure $expenditure)
    {

        $this->dispatch(
            new DestroyExpenditureJob($expenditure)
        );

        return redirect()->back();
    }
}
