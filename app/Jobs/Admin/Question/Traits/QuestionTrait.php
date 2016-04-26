<?php
namespace DreamsArk\Jobs\Admin\Question\Traits;

use DreamsArk\Jobs\Admin\Question\Option\CreateOptionJob;
use DreamsArk\Models\Master\Question\Option;
use Illuminate\Support\Collection;

trait QuestionTrait
{
    private function doOptionUpdate(Option $option)
    {
        /**
         * Check if Type is radio/checkbox/select
         * sync options
         */
        if (in_array($this->type->getAttribute('name'), ['radio', 'checkbox', 'select'])) {

            /**
             * Get Final Options
             */
            $options = $this->getOptions($option);

            /**
             * Sync Options
             */
            $this->question->options()->sync($options->pluck('id')->toArray());

        } else
            $this->question->options()->sync([]);
    }

    /**
     * Diff the Request Options from the Options in database
     *
     * @param Option $option
     * @return Collection
     */
    private function getOptions(Option $option)
    {

        $original = array_get($this->fields, 'options', []) ?: $this->options;

        /** @var Collection $options */
        $options = $option->whereIn('name', $original)->get(['id', 'name']);

        /**
         * For each new Key create a new Object
         */
        foreach (array_diff($original, $options->pluck('name')->toArray()) as $option) {
            $options->push(dispatch(new CreateOptionJob($option)));
        }

        return $options;

    }
}