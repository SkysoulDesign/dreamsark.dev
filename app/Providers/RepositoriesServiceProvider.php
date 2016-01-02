<?php

namespace DreamsArk\Providers;

use DreamsArk\Repositories\Bag\BagRepository;
use DreamsArk\Repositories\Bag\BagRepositoryInterface;
use DreamsArk\Repositories\Project\Draft\DraftRepository;
use DreamsArk\Repositories\Project\Draft\DraftRepositoryInterface;
use DreamsArk\Repositories\Project\Expenditure\ExpenditureRepository;
use DreamsArk\Repositories\Project\Expenditure\ExpenditureRepositoryInterface;
use DreamsArk\Repositories\Project\Fund\FundRepository;
use DreamsArk\Repositories\Project\Fund\FundRepositoryInterface;
use DreamsArk\Repositories\Project\Idea\IdeaRepository;
use DreamsArk\Repositories\Project\Idea\IdeaRepositoryInterface;
use DreamsArk\Repositories\Project\ProjectRepository;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;
use DreamsArk\Repositories\Project\Review\ReviewRepository;
use DreamsArk\Repositories\Project\Review\ReviewRepositoryInterface;
use DreamsArk\Repositories\Project\Script\ScriptRepository;
use DreamsArk\Repositories\Project\Script\ScriptRepositoryInterface;
use DreamsArk\Repositories\Project\Submission\SubmissionRepository;
use DreamsArk\Repositories\Project\Submission\SubmissionRepositoryInterface;
use DreamsArk\Repositories\Project\Synapse\SynapseRepository;
use DreamsArk\Repositories\Project\Synapse\SynapseRepositoryInterface;
use DreamsArk\Repositories\Project\Vote\VoteRepository;
use DreamsArk\Repositories\Project\Vote\VoteRepositoryInterface;
use DreamsArk\Repositories\Report\ReportRepository;
use DreamsArk\Repositories\Report\ReportRepositoryInterface;
use DreamsArk\Repositories\Setting\SettingRepository;
use DreamsArk\Repositories\Setting\SettingRepositoryInterface;
use DreamsArk\Repositories\Translation\TranslationRepository;
use DreamsArk\Repositories\Translation\TranslationRepositoryInterface;
use DreamsArk\Repositories\User\Role\RoleRepository;
use DreamsArk\Repositories\User\Role\RoleRepositoryInterface;
use DreamsArk\Repositories\User\UserRepository;
use DreamsArk\Repositories\User\UserRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepositoriesServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        /**
         * User Repository
         */
        $this->app->bind(
            UserRepositoryInterface::class,
            UserRepository::class
        );

        /**
         * Role Repository
         */
        $this->app->bind(
            RoleRepositoryInterface::class,
            RoleRepository::class
        );

        /**
         * Bag Repository
         */
        $this->app->bind(
            BagRepositoryInterface::class,
            BagRepository::class
        );

        /**
         * Setting Repository
         */
        $this->app->bind(
            SettingRepositoryInterface::class,
            SettingRepository::class
        );

        /**
         * Report Repository
         */
        $this->app->bind(
            ReportRepositoryInterface::class,
            ReportRepository::class
        );

        /**
         * Translation Repository
         */
        $this->app->bind(
            TranslationRepositoryInterface::class,
            TranslationRepository::class
        );

        /**
         * Idea Repository
         */
        $this->app->bind(
            IdeaRepositoryInterface::class,
            IdeaRepository::class
        );

        /**
         * Synapse Repository
         */
        $this->app->bind(
            SynapseRepositoryInterface::class,
            SynapseRepository::class
        );

        /**
         * Script Repository
         */
        $this->app->bind(
            ScriptRepositoryInterface::class,
            ScriptRepository::class
        );

        /**
         * Review Repository
         */
        $this->app->bind(
            ReviewRepositoryInterface::class,
            ReviewRepository::class
        );

        /**
         * Project Repository
         */
        $this->app->bind(
            ProjectRepositoryInterface::class,
            ProjectRepository::class
        );

        /**
         * Draft Repository
         */
        $this->app->bind(
            DraftRepositoryInterface::class,
            DraftRepository::class
        );

        /**
         * Vote Repository
         */
        $this->app->bind(
            VoteRepositoryInterface::class,
            VoteRepository::class
        );

        /**
         * Submission Repository
         */
        $this->app->bind(
            SubmissionRepositoryInterface::class,
            SubmissionRepository::class
        );

        /**
         * Submission Repository
         */
        $this->app->bind(
            ExpenditureRepositoryInterface::class,
            ExpenditureRepository::class
        );

        /**
         * Fund Repository
         */
        $this->app->bind(
            FundRepositoryInterface::class,
            FundRepository::class
        );

    }
}
