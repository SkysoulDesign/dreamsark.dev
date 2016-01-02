<?php

namespace DreamsArk\Presenters\Presenter;

use DreamsArk\Presenters\Presenter;

class ProjectPresenter extends Presenter
{

    /**
     * Returns a HTML progress bar
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
        $pledged = $this->backers->sum('pivot.amount');
        return round(($pledged * 100) / $cost);
    }

}