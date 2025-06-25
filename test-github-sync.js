// Test script to check GitHub repository filtering
const fetch = require('node-fetch');

async function testGitHubSync() {
    try {
        console.log('🔍 Fetching repositories from GitHub...\n');

        const response = await fetch('https://api.github.com/users/MuhammadKhan148/repos?sort=updated&per_page=100', {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-Test/1.0',
            },
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const allRepos = await response.json();
        console.log(`📦 Total repositories found: ${allRepos.length}\n`);

        // Apply the new filtering logic
        const portfolioRepos = allRepos.filter(repo => {
            // Exclude these types of repos
            if (repo.fork) return false;
            if (repo.private) return false;
            if (repo.name.includes('.github')) return false;
            if (repo.name.toLowerCase().includes('dotfiles')) return false;
            if (repo.name.toLowerCase() === 'muhammadkhan148') return false;

            // Include most repositories with these conditions:
            return (
                repo.language ||
                repo.description ||
                repo.stargazers_count > 0 ||
                repo.forks_count > 0 ||
                repo.topics?.length > 0 ||
                repo.pushed_at
            );
        });

        console.log(`✅ Filtered repositories for portfolio: ${portfolioRepos.length}\n`);

        // Show excluded repositories
        const excludedRepos = allRepos.filter(repo => {
            if (repo.fork) return true;
            if (repo.private) return true;
            if (repo.name.includes('.github')) return true;
            if (repo.name.toLowerCase().includes('dotfiles')) return true;
            if (repo.name.toLowerCase() === 'muhammadkhan148') return true;
            return false;
        });

        console.log(`❌ Excluded repositories: ${excludedRepos.length}`);
        if (excludedRepos.length > 0) {
            console.log('Excluded repos:');
            excludedRepos.forEach(repo => {
                const reasons = [];
                if (repo.fork) reasons.push('fork');
                if (repo.private) reasons.push('private');
                if (repo.name.includes('.github')) reasons.push('meta');
                if (repo.name.toLowerCase().includes('dotfiles')) reasons.push('dotfiles');
                if (repo.name.toLowerCase() === 'muhammadkhan148') reasons.push('profile');
                console.log(`  - ${repo.name} (${reasons.join(', ')})`);
            });
        }

        console.log('\n📋 Portfolio repositories that will be shown:');
        portfolioRepos.slice(0, 15).forEach((repo, index) => {
            console.log(`${index + 1}. ${repo.name}`);
            console.log(`   Description: ${repo.description || 'No description'}`);
            console.log(`   Language: ${repo.language || 'None'}`);
            console.log(`   Stars: ${repo.stargazers_count}, Forks: ${repo.forks_count}`);
            console.log(`   Topics: ${repo.topics?.join(', ') || 'None'}`);
            console.log(`   Updated: ${repo.updated_at.split('T')[0]}\n`);
        });

        if (portfolioRepos.length > 15) {
            console.log(`... and ${portfolioRepos.length - 15} more repositories`);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testGitHubSync(); 