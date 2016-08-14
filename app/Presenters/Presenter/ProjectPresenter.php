<?php

namespace DreamsArk\Presenters\Presenter;

use Carbon\Carbon;
use DreamsArk\Models\Project\Expenditures\Crew;
use DreamsArk\Models\Project\Expenditures\Expenditure;
use DreamsArk\Presenters\Presenter;

/**
 * Class ProjectPresenter
 *
 * @package DreamsArk\Presenters\Presenter
 */
class ProjectPresenter extends Presenter
{

    /**
     * Calculate the total cost of the entire project based on the expenditures it has
     *
     * @return int
     */
    public function expendituresCost() : int
    {
        return $this->model->getAttribute('expenditures')->sum(function (Expenditure $expenditure) {

            if (($type = $expenditure->getAttribute('expenditurable')) instanceof Crew) {
                return $type->dispenses->sum('amount');
            }

            return $type->cost;

        });
    }

    /**
     * Shows the project current finantial goal
     *
     * @return int
     */
    public function goal(): int
    {
        return $this->expendituresCost();
    }

    /**
     * Displays spent budget
     *
     * @return int
     */
    public function spentBudget() :int
    {
        return $this->model->getAttribute('expenditures')->sum(function (Expenditure $expenditure) {

            if (($type = $expenditure->getAttribute('expenditurable')) instanceof Crew) {
                return $type->dispenses->sum('amount');
            }

        });
    }

    /**
     * Get Voting date
     *
     * @return string
     */
    public function getVotingDate()
    {
        return $this->stage->vote->open_date->format('m/d/Y H:i');
    }

    /**
     * Get Voting date
     *
     * @return string
     */
    public function getCloseVotingDate()
    {
        return $this->stage->vote->close_date->format('m/d/Y H:i');
    }

    /**
     * Get Remaining date
     *
     * @return string
     */
    public function getRemainingDays()
    {
        return $this->stage->vote->open_date->diffInHours();
    }

    /**
     * Returns a HTML progress bar
     *
     * @return string
     */
    public function progressBar()
    {
        $progress = $this->progress();
        return '<div class="ui indicating progress active" data-percent="' . ($progress > 100 ? 100 : $progress) . '">' .
        '<div class="bar" style="transition-duration: 300ms; width: ' . ($progress > 100 ? 100 : $progress) . '%;"></div>' .
        '<div class="label">' . $progress . '% Funded</div>' .
        '</div>';
    }

    /**
     * Return project completion
     *
     * @return string
     */
    public function progress()
    {

        $cost = $this->expenditures->pluck('expenditurable')->sum('cost');

//        $pledged = $this->backers->sum('pivot.amount');
        $pledged = $this->totalCollected();
        return round(($pledged * 100) / $cost);
    }

    /**
     * Get the time completion of an project stage
     *
     * @return int
     */
    public function timeProgress() : int
    {


        $begin = $this->stage->vote->created_at;
        $now = Carbon::now();
        $end = $this->stage->vote->open_date;

//        dd($begin, $now, $end);

        $percent = ($now->diffInSeconds($begin)) / ($end->diffInSeconds($begin)) * 100;

        return $percent > 100 ? 100 : round($percent);


    }

}
