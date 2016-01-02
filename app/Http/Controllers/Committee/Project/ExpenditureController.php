<?php

namespace DreamsArk\Http\Controllers\Committee\Project;

use DreamsArk\Commands\Committee\Project\DestroyExpenditureCommand;
use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Models\Project\Expenditures\Expenditure;

class ExpenditureController extends Controller
{

    /**
     * Remove the specified resource from storage.
     *
     * @param Expenditure $expenditure
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function destroy(Expenditure $expenditure)
    {
        $this->dispatch(new DestroyExpenditureCommand($expenditure));
        return redirect()->back();
    }
}
