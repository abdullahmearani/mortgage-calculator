document.addEventListener("DOMContentLoaded", function() {
    const propertyPrice = document.getElementById("wp-mortgage-propertyPrice");
    const downPayment = document.getElementById("wp-mortgage-downPayment");
    const loanPeriod = document.getElementById("wp-mortgage-loanPeriod");
    const interestRate = document.getElementById("wp-mortgage-interestRate");
    const downPaymentPercent = document.getElementById("wp-mortgage-downPaymentPercent");
    const monthlyPayment = document.getElementById("wp-mortgage-monthlyPayment");

    const propertyPriceSlider = document.getElementById("wp-mortgage-propertyPriceSlider");
    const downPaymentSlider = document.getElementById("wp-mortgage-downPaymentSlider");
    const loanPeriodSlider = document.getElementById("wp-mortgage-loanPeriodSlider");
    const interestRateSlider = document.getElementById("wp-mortgage-interestRateSlider");

    propertyPriceSlider.addEventListener("input", () => {
        propertyPrice.value = propertyPriceSlider.value;
        updateCalculation();
    });

    downPaymentSlider.addEventListener("input", () => {
        downPaymentPercent.innerText = `${downPaymentSlider.value}%`;
        downPayment.value = Math.round((propertyPrice.value * downPaymentSlider.value) / 100);
        updateCalculation();
    });

    loanPeriodSlider.addEventListener("input", () => {
        loanPeriod.value = loanPeriodSlider.value;
        updateCalculation();
    });

    interestRateSlider.addEventListener("input", () => {
        interestRate.value = interestRateSlider.value;
        updateCalculation();
    });

    function updateCalculation() {
        let P = propertyPrice.value - downPayment.value;
        let r = interestRate.value / 100 / 12;
        let n = loanPeriod.value * 12;

        let M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        monthlyPayment.innerText = Math.round(M) + " AED";

        updateChart(P, downPayment.value);
    }

    let ctx = document.getElementById('wp-mortgage-loanChart').getContext('2d');
    let loanChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Loan Amount', 'Down Payment'],
            datasets: [{
                data: [75, 25],
                backgroundColor: ['#222', '#f4b400'],
            }]
        },
        options: {
            responsive: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#fff'
                    }
                }
            }
        }
    });

    function updateChart(loan, down) {
        loanChart.data.datasets[0].data = [loan, down];
        loanChart.update();
    }

    updateCalculation();
});