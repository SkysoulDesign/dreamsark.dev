<?php

namespace DreamsArk\Presenters\Presenter;

use DreamsArk\Presenters\Presenter;

/**
 * Class ProjectPresenter
 *
 * @package DreamsArk\Presenters\Presenter
 */
class ProjectPresenter extends Presenter
{

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

}
