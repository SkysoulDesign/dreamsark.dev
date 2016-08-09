<?php

namespace DreamsArk\Providers;

use DreamsArk\Models\Project\Expenditures\Crew;
use DreamsArk\Models\Project\Expenditures\Expenditure;
use DreamsArk\Models\Project\Expenditures\Expense;
use DreamsArk\Models\Project\Reward;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Idea;
use DreamsArk\Models\Project\Stages\Review;
use DreamsArk\Models\Project\Stages\Script;
use DreamsArk\Models\Project\Stages\Synapse;
use DreamsArk\Models\Project\Stages\Vote;
use DreamsArk\Models\Project\Submission;
use Illuminate\Support\ServiceProvider;
use Illuminate\View\Compilers\BladeCompiler;
use Illuminate\Database\Eloquent\Relations\Relation;

/**
 * Class AppServiceProvider
 *
 * @package DreamsArk\Providers
 */
class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @param \Illuminate\View\Compilers\BladeCompiler $blade
     */
    public function boot(BladeCompiler $blade)
    {

        $blade->directive('set', function ($expression) {
            list($name, $val) = explode(',', $expression);
            return "<?php {$name} = {$val}; ?>";
        });

        /**
         * Morph Class Map
         */
        Relation::morphMap([
            'ideas' => Idea::class,
            'synapses' => Synapse::class,
            'scripts' => Script::class,
            'reviews' => Review::class,
            'funds' => Fund::class,
            'rewards' => Reward::class,
            'expenditures' => Expenditure::class,
            'crews' => Crew::class,
            'expenses' => Expense::class,
            'submissions' => Submission::class,
            'votes' => Vote::class,
        ]);

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

    }

}
